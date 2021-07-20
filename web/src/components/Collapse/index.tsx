import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

import { Container, Header, Content } from './styles';

interface Props {
  startExpanded?: boolean;
  render?: () => React.ReactNode;
  onChange?: (expanded?: boolean) => void;
}

const Collapse: React.FC<Props> = ({
  render,
  startExpanded,
  onChange,
  children,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    if (startExpanded) setExpanded(startExpanded);
  }, []);

  function onExpandClicked() {
    if (onChange) onChange(!expanded);
    setExpanded(!expanded);
  }

  return (
    <Container>
      <Header className={expanded ? 'expanded' : ''}>
        <MdKeyboardArrowRight className={expanded ? 'rotate' : ''} onClick={onExpandClicked} size={28} />
        {render ? render() : undefined}
      </Header>
      {expanded ? <Content>{children}</Content> : undefined}
    </Container>
  );
};

export default Collapse;
