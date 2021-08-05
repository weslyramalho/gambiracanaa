import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { PageContainer } from '../../components/MainComponents';
import { PageArea } from './styled';
import useAPI from '../../helpers/GambiraCanaaApi';


const Page = () => {
  //  const api = useAPI();
    const { id } = useParams();
//
  //  const [ loading, setLoading] = useState(true);
  //  const [ adInfo, setAdInfo ] = useState([]);

    return (
        <PageContainer>
            <PageArea>
          
            </PageArea>
        </PageContainer>

    )
}

export default Page;