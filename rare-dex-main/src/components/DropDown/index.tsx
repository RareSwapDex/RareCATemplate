import React, { useEffect, useState } from 'react';

type DropDownProps = {
  values: string[];
  showDropDown: boolean;
  toggleDropDown: Function;
  valueSelection: Function;
};

const DropDown: React.FC<DropDownProps> = ({
  values,
  valueSelection,
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  /**
   * Handle passing the value name
   * back to the parent component
   *
   * @param value  The selected value
   */
  const onClickHandler = (value: string): void => {
    valueSelection(value);
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <>
      <div className={showDropDown ? 'dropdown' : 'dropdown active'}>
        {values.map(
          (value: string, index: number): JSX.Element => {
            return (
              <p
                key={index}
                onClick={(): void => {
                  onClickHandler(value);
                }}
              >
                {value}
              </p>
            );
          }
        )}
      </div>
    </>
  );
};

export default DropDown;
