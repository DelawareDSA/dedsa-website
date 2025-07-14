type BugSize = 'small' | 'medium' | 'large';

export const UnionBug = ({
  printer = 'Local 123',
  size = 'small',
}: {
  printer?: string;
  size?: BugSize;
}) => {
  const sizes: Record<BugSize, { width: string; fontSize: string }> = {
    small: { width: '0.5in', fontSize: '6pt' },
    medium: { width: '0.75in', fontSize: '8pt' },
    large: { width: '1in', fontSize: '10pt' },
  };

  return (
    <div
      className="union-bug absolute bottom-2 right-2 text-dsa-black-t3"
      style={{ width: sizes[size].width, fontSize: sizes[size].fontSize }}
    >
      <div className="border border-current p-1 text-center">
        UNION PRINTED
        <br />
        {printer}
      </div>
    </div>
  );
};
