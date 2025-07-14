#!/usr/bin/env bash
set -euo pipefail

# list of files to patch
files=(
  "src/features/calendar/components/CustomMonthView.tsx"
  "src/features/calendar/components/MonthView.tsx"
  "src/features/calendar/components/CalendarFilters.tsx"
  "src/core/context/AppContext.tsx"
  "src/app/page.tsx"
  "src/features/bylaws/components/FrequentlyAskedQuestions.tsx"
)

for f in "${files[@]}"; do
  if [[ -f "$f" ]]; then
    echo "Patching $f…"

    # 1) ensure safeFilter import
    grep -q "import { safeFilter }" "$f" || sed -i "1iimport { safeFilter } from 'src/utils/safeFilter';" "$f"

    # 2) replace .filter( calls with safeFilter
    sed -E -i \
      -e 's/([[:alnum:]_]+\.)?filter\(/safeFilter(/g' \
      "$f"
  else
    echo "⚠️  Skipping missing file: $f"
  fi
done

echo "✔️  Patches applied."
