"use client";

import { useState, useEffect } from "react";
import styled, { keyframes, ThemeProvider } from "styled-components";
import { theme } from "@/lib/theme";

// Animations
const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0,-30px,0);
  }
  70% {
    transform: translate3d(0,-15px,0);
  }
  90% {
    transform: translate3d(0,-4px,0);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(32px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.background.light};
  
  @media (prefers-color-scheme: dark) {
    background: ${props => props.theme.colors.background.dark};
  }
`;

const Container = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
  text-align: center;
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 ${props => props.theme.spacing.lg};
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0 ${props => props.theme.spacing['2xl']};
  }
`;

const ContentWrapper = styled.div<{ $mounted: boolean }>`
  transition: all 1000ms ease-out;
  opacity: ${props => props.$mounted ? 1 : 0};
  transform: translateY(${props => props.$mounted ? '0' : '32px'});
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSize['5xl']};
  font-weight: bold;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSize['6xl']};
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSize['7xl']};
  }
  
  @media (prefers-color-scheme: dark) {
    color: ${props => props.theme.colors.text.white};
  }
`;

const GradientText = styled.span`
  background: ${props => props.theme.colors.primary.gradient};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.fontSize.xl};
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSize['2xl']};
  }
  
  @media (prefers-color-scheme: dark) {
    color: ${props => props.theme.colors.text.lightGray};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  justify-content: center;
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: row;
  }
`;

const PrimaryButton = styled.a`
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing['2xl']};
  background-color: ${props => props.theme.colors.primary.blue};
  color: ${props => props.theme.colors.text.white};
  font-weight: 600;
  border-radius: ${props => props.theme.borderRadius.lg};
  text-decoration: none;
  transition: background-color 200ms ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary.blueHover};
  }
`;

const SecondaryButton = styled.a`
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing['2xl']};
  border: 2px solid ${props => props.theme.colors.primary.blue};
  color: ${props => props.theme.colors.primary.blue};
  font-weight: 600;
  border-radius: ${props => props.theme.borderRadius.lg};
  text-decoration: none;
  transition: all 200ms ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary.blue};
    color: ${props => props.theme.colors.text.white};
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: ${props => props.theme.spacing['2xl']};
  left: 50%;
  transform: translateX(-50%);
  animation: ${bounce} 2s infinite;
`;

const ScrollIcon = styled.svg`
  width: ${props => props.theme.spacing.lg};
  height: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text.secondary};
`;

const StyledHero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <HeroSection>
        <Container>
          <ContentWrapper $mounted={mounted}>
            <Title>
              Hi, I&apos;m{' '}
              <GradientText>
                Rivka
              </GradientText>
            </Title>
            <Subtitle>
              A passionate developer creating beautiful and functional digital experiences
            </Subtitle>
            <ButtonContainer>
              <PrimaryButton href="#projects">
                View My Work
              </PrimaryButton>
              <SecondaryButton href="#contact">
                Get In Touch
              </SecondaryButton>
            </ButtonContainer>
          </ContentWrapper>
          
          {/* Scroll indicator */}
          <ScrollIndicator>
            <ScrollIcon fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </ScrollIcon>
          </ScrollIndicator>
        </Container>
      </HeroSection>
    </ThemeProvider>
  );
};

export default StyledHero;