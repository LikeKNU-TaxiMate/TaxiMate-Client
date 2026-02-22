import { SetRegisterDataFunc, SetStep } from '@/types';

export interface ContentWrapProps {
  value: string | { longitude: number; latitude: number };
  setRegisterDataFunc?: SetRegisterDataFunc;
  setStep?: SetStep;
}
