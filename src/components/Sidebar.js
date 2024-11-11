import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';

export const SidebarContainer = styled.div`
  width: 200px;
  background-color: #2c3e50;
  color: white;
  height: 100vh;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};

  @media (min-width: 768px) {
    transform: translateX(0);
  }
`;

export const SidebarLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
  background-color: #34495e;
  transition: background-color 0.3s;

  &.active {
    background-color: #1abc9c;
  }

  &:hover {
    background-color: #1abc9c;
  }
`;

const MenuButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #2c3e50;
  color: white;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;

  @media (min-width: 768px) {
    display: none;
  }
`;

const ContainerLink = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MenuButton onClick={toggleSidebar}>
        <FaBars />
      </MenuButton>
      <SidebarContainer isOpen={isOpen}>
        <ContainerLink>
          <SidebarLink exact to="/" activeClassName="active">
            Dashboard
          </SidebarLink>
          <SidebarLink to="/jobposting" activeClassName="active">
            Job Postings
          </SidebarLink>
          <SidebarLink to="/create-assessment" activeClassName="active">
            Assessments
          </SidebarLink>
        </ContainerLink>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
