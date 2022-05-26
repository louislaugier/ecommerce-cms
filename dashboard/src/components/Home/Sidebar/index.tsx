import * as Router from "react-router-dom";
import { IconButton, Box, CloseButton, Flex, Icon, useColorModeValue, Link, Drawer, DrawerContent, Text, useDisclosure } from '@chakra-ui/react';
import { FiBox, FiList, FiSend, FiUser, FiLogOut, FiMenu } from 'react-icons/fi';
import { BarProps, LinkItemProps, MobileProps, NavItemProps, SidebarProps } from '../../../interfaces/Props';

const LinkItems: Array<LinkItemProps> = [
	{ name: 'Products', icon: FiBox },
	{ name: 'Categories', icon: FiList },
	{ name: 'Orders', icon: FiSend },
	{ name: 'Users', icon: FiUser },
	{ name: 'Logout', icon: FiLogOut }
];

const Sidebar = (props: SidebarProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
			<SidebarContent
				setTab={props.setTab}
				tabs={props.tabs}
				onClose={() => onClose}
				display={{ base: 'none', md: 'block' }} />
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full">
				<DrawerContent>
					<SidebarContent setTab={props.setTab} tabs={props.tabs} onClose={onClose} />
				</DrawerContent>
			</Drawer>
			<MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
		</Box>
	);
}

export default Sidebar;

const SidebarContent = ({ onClose, setTab, tabs, ...otherProps }: BarProps) => {
	return (
		<Box
			bg={useColorModeValue('white', 'gray.900')}
			borderRight="1px"
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w={{ base: 'full', md: 60 }}
			pos="fixed"
			h="full"
			{...otherProps}>
			<Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
				<Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
					Logo
				</Text>
				<CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
			</Flex>
			{LinkItems.map((link, i) => (
				<Router.Link key={i} to={"/" + link.name.toLowerCase()}>
					<NavItem onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
						setTab(tabs[i])
					}} key={link.name} icon={link.icon}>
						{link.name}
					</NavItem>
				</Router.Link>
			))}
		</Box>
	);
};

const NavItem = ({ icon, children, ...otherProps }: NavItemProps) => {
	return (
		<Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
			<Flex
				align="center"
				p="4"
				mx="4"
				borderRadius="lg"
				role="group"
				cursor="pointer"
				_hover={{
					bg: 'cyan.400',
					color: 'white',
				}}
				{...otherProps}>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: 'white',
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	);
};

const MobileNav = ({ onOpen, ...otherProps }: MobileProps) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 24 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue('white', 'gray.900')}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent="flex-start"
			{...otherProps}>
			<IconButton
				variant="outline"
				onClick={onOpen}
				aria-label="open menu"
				icon={<FiMenu />}
			/>

			<Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
				Logo
			</Text>
		</Flex>
	);
};