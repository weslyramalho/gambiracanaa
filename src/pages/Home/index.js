import React from 'react';
import { useState, useEffect } from 'react';
import { PageContainer } from '../../components/MainComponents';
import { PageArea, SearchArea } from './styled';
import useAPI from '../../helpers/GambiraCanaaApi';
import { Link } from 'react-router-dom';
import AdItem from '../../components/partials/AdItem';



const Page = () => {
    const api = useAPI();

    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);

    useEffect(()=>{
        const getStates = async()=> {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    useEffect(()=>{
        const getCategories = async()=> {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    useEffect(()=>{
        const getRecentAds = async()=> {
            const json = await api.getAds({
                sort: 'desc',
                limit: 8

            });
            setAdList(json.ads);
        
        }
        getRecentAds();
    }, []);


    return (
        <>
        <SearchArea>
            <PageContainer>
                <div className="searchBox">
                    <form method="GET" action="/ads">
                        <input type="text" name="q" placeholder="O que você procura?"/>
                        <select name="state">
                            {stateList.map((i, k)=>
                            <option key={k} value={i.name}>{i.name}</option>
                            )}

                        </select>
                        <button>Pesquisar</button>
                    </form>
                </div>
                <div className="categoryList">
                    {categories.map((i,k)=>
                    <Link key={k} to={`/ads?cat=${i.slug}`} className="categoryItem">
                        <img src={i.img} alt=""/>
                        <span>{i.name}</span>
                    </Link>
                    )}

                </div>
            </PageContainer>
        </SearchArea>
        <PageContainer>
            <PageArea>
                <h2>Anúncios Recentes</h2>
                <div className="list">
                    {adList.map((i,k)=>
                    <AdItem key={k} data={i} />
                    )}
                </div>
                <Link to="/ads" className="seeAllLink">Ver todos</Link>
                <hr />
            </PageArea>
        </PageContainer>
        </>

    )
}

export default Page;