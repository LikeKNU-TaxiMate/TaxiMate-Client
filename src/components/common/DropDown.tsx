import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  //DropdownSection,
  DropdownItem,
} from '@nextui-org/dropdown';
import EllipsisVerticalIcon from '@/assets/icons/common/ellipsis-vertical-icon.svg?react';

const DropDown = ({
  // items,
  danger,
  leaveChatHandler,
}: {
  // items: string[];
  danger: string;
  leaveChatHandler: () => void;
}) => {
  // console.log(items);

  return (
    <Dropdown radius='sm' className={'min-w-[70px]'}>
      <DropdownTrigger>
        <button>
          <EllipsisVerticalIcon />
        </button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Custom item styles'
        itemClasses={{ base: ['text-center'] }}
      >
        {/*<DropdownSection>*/}
        {/*  {items.map((item, index) => (*/}
        {/*    <DropdownItem key={item + index} showDivider>*/}
        {/*      {item}*/}
        {/*    </DropdownItem>*/}
        {/*  ))}*/}
        {/*</DropdownSection>*/}
        <DropdownItem
          key='delete'
          className='text-danger '
          color='danger'
          onClick={leaveChatHandler}
        >
          {danger}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDown;
