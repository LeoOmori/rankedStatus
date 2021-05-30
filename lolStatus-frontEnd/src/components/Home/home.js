import { useState } from 'react';
import {useHistory} from "react-router-dom";
import {
    Wrapper,
    InputForm, 
    LogoDiv, 
    InputText, 
    DropdownMenu, 
    ValueDropDown,
    DropDownMenuDiv,
    DropDownMenuContent,
    ListItems

} from "./styled";
import logo1 from '../../assets/logo 1.png';
import logo2 from '../../assets/logo 2.png';


import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineDown } from "react-icons/ai";


const ArrayServers = [
    'BR',
    'EUNE',
    'EUW',
    'LAN',
    'LAS',
    'NA',
    'OCE',
    'RU',
    'TR',
    'JP',
    'KR'
    
]


function Home() {

    
    const [searchValue, setSearchValue] = useState('');
    const [server, setServer] = useState('BR');

    const history = useHistory();


    const handleSubmit = (event) => {

        history.push({

            pathname:`/statusPage/${searchValue}`, 
            state:{server},

            }
        );
        event.preventDefault();

    }

    const onChange = (event) => {
        setSearchValue(event.target.value);
    }

    return (
        <Wrapper>

            <LogoDiv>

                <img src={logo1} alt=''/>
                <img src={logo2} alt=''/>

            </LogoDiv>
            <InputForm onSubmit={handleSubmit}>
                <AiOutlineSearch size={32}/>
                <InputText 
                    type="text"
                    placeholder={"ex: kami, takeshi"}
                    value={searchValue}
                    onChange={onChange}
                />
                <DropDownMenuDiv>
                    <DropdownMenu>
                        <ValueDropDown>{server}</ValueDropDown>
                        <AiOutlineDown  color={'#666666'}/>
                    </DropdownMenu>
                    <DropDownMenuContent>

                        <ListItems>
                        {

                            ArrayServers.map((elements,index) => (

                                <li key={index}><a onClick={() => { setServer(elements) }}>{elements}</a></li>
    

                            ))
                        }    
                        </ListItems>




                    </DropDownMenuContent>
                </DropDownMenuDiv>
            </InputForm>


        </Wrapper>

    );
}
  
export default Home;
  