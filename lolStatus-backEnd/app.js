const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config()

const app = express();

app.use(cors());

const APIKEY = process.env.RIOT_API;

const servers = {

    BR:'br1.api.riotgames.com',
    EUN:'eun1.api.riotgames.com',
    EUW:'euw1.api.riotgames.com',
    JP: 'jp1.api.riotgames.com',
    KR: 'kr.api.riotgames.com',
    LAN: 'la1.api.riotgames.com',
    LAS: 'la2.api.riotgames.com',
    NA: 'na1.api.riotgames.com',
    OC: 'oc1.api.riotgames.com',
    TR: 'tr1.api.riotgames.com',
    RU: 'ru.api.riotgames.com'

}


const champById = (id, champList) => {

    const arrayOfelements = Object.keys(champList.data);

    for(let i = 0; i<arrayOfelements.length; i++){

        if(champList.data[arrayOfelements[i]].key == id){

            return champList.data[arrayOfelements[i]].id
        }
    }
}


app.get('/summoner/:summonerName/:server', async (req,res) => {

    axios.defaults.headers.common['X-Riot-Token'] = APIKEY; 
    const {summonerName, server} = req.params;
    const region = servers[server];

    let resData =  {

        avatar:'',
        name:'',
        elo:'',
        rank:'',
        level:0,
        wins:0,
        losses:0,
        winRate:0,
        MostPlayedChampions: [],

    }
    
    let user;
    try{
        user = await axios.get(
            `https://${region}/lol/summoner/v4/summoners/by-name/${ encodeURI(summonerName) }`
        );
    }catch(e){
        return res.status(400).json({message:'summoner not found'});
    }

    
    const userId = user.data.id;
    
    const rankedData = await axios.get(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${userId}`);
    
    if(rankedData.data.length == 0) return res.status(400).json({message:'summoner not on level to play ranked'}); 

    resData.elo = rankedData.data[0].tier;
    resData.rank = rankedData.data[0].rank;
    resData.wins = rankedData.data[0].wins;
    resData.losses = rankedData.data[0].losses;
    resData.points = rankedData.data[0].leaguePoints;
    resData.winRate = 100*(rankedData.data[0].wins / (rankedData.data[0].wins + rankedData.data[0].losses));
    resData.avatar =`http://ddragon.leagueoflegends.com/cdn/11.11.1/img/profileicon/${user.data.profileIconId}.png`;
    resData.level = user.summonerLevel;
    resData.name = user.data.name;
    resData.name = user.data.name;


    const championsMasteries = await axios.get(`https://${region}/lol/champion-mastery/v4/champion-masteries/by-summoner/${userId}`)


    let arrayOfChampions = [];
    for(let i = 0; i<4; i++){

        arrayOfChampions.push(championsMasteries.data[i]);

    }

    const allChampions = await axios.get('http://ddragon.leagueoflegends.com/cdn/11.11.1/data/en_US/champion.json');
    

    arrayOfChampions.forEach(element => {

        let champInfo = {

            name: '',
            points: element.championPoints,
            img:''

        }
        
        const name = champById(element.championId , allChampions.data);

        champInfo.name = name;
        champInfo.img = `http://ddragon.leagueoflegends.com/cdn/11.11.1/img/champion/${name}.png`
        resData.MostPlayedChampions.push(champInfo); 
    });

    return res.json(resData);

} );


app.listen('3333', () =>{

    console.log('server on');

});