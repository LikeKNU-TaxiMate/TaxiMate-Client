import { RadioGroup, Radio } from '@nextui-org/radio';

export default function NextRadio({
  value,
  setMemberValue,
}: {
  value: string;
  setMemberValue: (e: string) => void;
}) {
  return (
    <RadioGroup
      orientation='horizontal'
      value={value}
      onValueChange={setMemberValue}
    >
      <Radio value='2'>2명</Radio>
      <Radio value='3'>3명</Radio>
      <Radio value='4'>4명</Radio>
    </RadioGroup>
  );
}
