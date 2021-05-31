import { Button, useColorModeValue, Icon } from '@chakra-ui/react'
import {IoArrowForwardOutline} from 'react-icons/io5'

 




 function ArrowRightButton(props) {
    
    const color = useColorModeValue("gray.900", "rgba(10, 10, 10, 0.50)")
    const iconColor = useColorModeValue("#EDF2F7", "#EDF2F7")


  return (
    <Button 
      backgroundColor={color}
      
      w="20px"

      style={{
      border: "none",
      boxShadow: "-1px 2px 5px 0 rgba(0, 0, 0, .25)"
      
    }}
        
      borderRadius="50%" {...props} ><Icon as={IoArrowForwardOutline} w="24px" h="30px" color={iconColor}/></Button>
  );
}
 export default ArrowRightButton