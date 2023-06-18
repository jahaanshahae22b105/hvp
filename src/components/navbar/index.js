import { Button, Flex, IconButton, Link } from "@chakra-ui/react";
import { useLogout } from "hooks/auth";
import { DASHBOARD, LEADERBOARD, UPCOMINGCONT } from "lib/routes";
import { FaPowerOff } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
export default function Navbar() {

    const {logout, isLoading} =useLogout();
  
    return (
      <Flex
        shadow="sm"
        pos="fixed"
        width="full"
        height="16"
        zIndex="3"
        justify="center"
        bg="white"
      >
        <Flex px="4" w="full" align="center" maxW="1200px">
          <Link color="blue" as={RouterLink} to={DASHBOARD} fontWeight="bold" mr="20">
            Dashboard
          </Link>
          <Link color="blue" as={RouterLink} to={LEADERBOARD} fontWeight="bold" mr="20">
            Leaderboard
          </Link>
          <Link color="blue" as={RouterLink} to={UPCOMINGCONT} fontWeight="bold" mr="20">
            Upcoming Content
          </Link>
          <IconButton
            ml="auto"
            colorScheme="gray"
            size="md"
            onClick={logout}
            isLoading={isLoading}
            icon={<FaPowerOff/>}
            borderRadius="50vh"

          >
            
          </IconButton>
          
        </Flex>
      </Flex>
    );
  }