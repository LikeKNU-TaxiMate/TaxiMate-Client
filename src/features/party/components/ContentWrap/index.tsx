import { ContentContainer, ContentTitle } from './ContentWrap.style.ts';

interface Props {
  theme: string;
  explain?: string;
  SvgIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}

const Index = ({ theme, explain, SvgIcon, children }: Props) => {
  return (
    <ContentContainer>
      <ContentTitle>
        <div>
          {theme}
          <SvgIcon />
        </div>
        {explain && <p>{explain}</p>}
      </ContentTitle>
      {children}
    </ContentContainer>
  );
};

export default Index;
