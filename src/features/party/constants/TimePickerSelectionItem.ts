import { SelectionKey } from '@/types';

export const TIME_PICKER_SELECTION_ITEM: Record<SelectionKey, string[]> = {
  meridiem: ['AM', 'PM'],
  hour: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  minute: [
    '0',
    '5',
    '10',
    '15',
    '20',
    '25',
    '30',
    '35',
    '40',
    '45',
    '50',
    '55',
  ],
};
