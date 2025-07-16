<?php
header('Content-Type: text/plain');
echo "CALENDAR_ID=" . getenv('GOOGLE_CALENDAR_ID') . "\n";
echo "CREDENTIALS=" . getenv('GOOGLE_APPLICATION_CREDENTIALS') . "\n";
