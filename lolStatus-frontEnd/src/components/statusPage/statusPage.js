import { useEffect, useState} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Loader from "react-loader-spinner";
import {
  Wrapper,
  LoadingPlaceholder ,
  AlertText,
  SummonerWrapper,
  Header,
  Avatar,
  UserInfo,
  UserName,
  EloInfo,
  Elo,
  EloIcon,
  KdaInfo,
  BoxInfo,
  BoxInfoText,
  Table,
  TableLine,
  TableHeader,
  TableText,
  ChampImage,


} from './styled';

import bronze from "../../assets/Emblem_Bronze.png";
import iron from "../../assets/Emblem_Iron.png";
import silver from "../../assets/Emblem_Silver.png";
import gold from "../../assets/Emblem_Gold.png";
import platinum from "../../assets/Emblem_Platinum.png";
import diamond from "../../assets/Emblem_Diamond.png";
import grandmaster from "../../assets/Emblem_Grandmaster.png";
import master from "../../assets/Emblem_Master.png";
import challenger from "../../assets/Emblem_Challenger.png";




function StatusPage() {

  let { summonerName } = useParams();
  const location = useLocation();

  


  const [ summonerInfo, setSummonerInfo ] = useState({});
  const [ loading, setLoading ] = useState(true);
  const [ isFound, setIsFound ] = useState(false);


  useEffect(() => {

    const fetchData = async () => {

      const summonerData = await fetch(`${process.env.REACT_APP_API}/summoner/${summonerName }/${location.state.server}`);

      if(summonerData.status === 400) {
        setIsFound(true);
      }

      const result = await summonerData.json()
      setSummonerInfo(result);
      setLoading(false);

    }

    fetchData();


  },[]);


  const setElo = (currentElo) => {

    switch(currentElo){

      case "BRONZE":
        return <EloIcon src={bronze} alt="elo" />;
      case "IRON":
        return <EloIcon src={iron} alt="elo" />;
      case "SILVER":
        return <EloIcon src={silver} alt="elo" />;
      case "GOLD":
        return <EloIcon src={gold} alt="elo" />;
      case "PLATINUM":
        return <EloIcon src={platinum} alt="elo" />;
      case "DIAMOND":
        return <EloIcon src={diamond} alt="elo" />;
      case "GRANDMASTER":
        return <EloIcon src={grandmaster} alt="elo" />;
      case "MASTER":
        return <EloIcon src={master} alt="elo" />;
      case "CHALLENGER":
        return <EloIcon src={challenger} alt="elo" />;
      default: break;


    }

  }



    if(isFound){

      return (

        <Wrapper>
          
          <SummonerWrapper>

            <LoadingPlaceholder>

              <AlertText>
                Usuário não existe ou ainda não está habilitado a jogar nas filas ranqueadas
              </AlertText>

            </LoadingPlaceholder>

          </SummonerWrapper>

        </Wrapper>

      )

    }

    if(loading){
      return (
        
        <Wrapper>

          <SummonerWrapper>

            <LoadingPlaceholder>

              <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />

            </LoadingPlaceholder>


          </SummonerWrapper>



        </Wrapper>

      )


    }

    return (
      <Wrapper>

          <SummonerWrapper>


          <Header>

            <Avatar src={summonerInfo.avatar} />
            <UserInfo>

              <UserName>{summonerInfo.name}</UserName>
              <EloInfo>

                {setElo(summonerInfo.elo)}
                <Elo>{ summonerInfo.elo + ' ' +summonerInfo.rank }</Elo>
                
              </EloInfo>

              <KdaInfo>

                <BoxInfo>
                  <BoxInfoText>{summonerInfo.wins}  V / {summonerInfo.losses} D</BoxInfoText>
                </BoxInfo>

                <BoxInfo>
                  <BoxInfoText>Taxa de vitória {summonerInfo.winRate.toFixed(2)}%</BoxInfoText>
                </BoxInfo>

              </KdaInfo>

            </UserInfo>

          </Header>

          <Table >
            <tbody>
              <tr>
                <TableHeader></TableHeader>
                <TableHeader>Campeão</TableHeader>
                <TableHeader>Pontos de maestria</TableHeader> 
              </tr>


                {
                  summonerInfo.MostPlayedChampions.map((element,id) => (
                  <TableLine key={id}>
                    <TableText>
                      <ChampImage src={element.img} />
                    </TableText>

                    <TableText>{id + 1}.{element.name}</TableText>
                    <TableText>{element.points}</TableText>


                  </TableLine>


                  ))
                }

            </tbody>
          </Table>


          </SummonerWrapper>

      </Wrapper>
    );
}
  
export default StatusPage;