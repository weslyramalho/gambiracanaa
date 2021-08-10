import React, { useEffect, useRef } from 'react';
import { useState} from 'react';
import MaskedInput from 'react-text-mask';
import  createNumberMask  from 'text-mask-addons/dist/createNumberMask';
import { ErrorMesssage, PageContainer, PageTitle } from '../../components/MainComponents';
import { PageArea } from './styled';
import useAPI from '../../helpers/GambiraCanaaApi';
import { useHistory } from 'react-router-dom';


const Page = () => {
    const api = useAPI();
    const history = useHistory();
    const fileFIeld = useRef();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState('');
    const [desc, setDesc] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('')
    const [categories, setCategories] = useState([]);


    useEffect(()=>{
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        let errors = [];

        if(!title.trim()){
            errors.push('Sem título');
        }
        if(!category){
            errors.push('Sem Categoria');
        }
        if(errors.length === 0){

            const fData = new FormData();
            fData.append('title', title);
            fData.append('price', price);
            fData.append('priceneg', priceNegotiable);
            fData.append('desc', desc);
            fData.append('cat', category);

            if(fileFIeld.current.files.length > 0){
                for(let i=0; i < fileFIeld.current.files.length; i++){
                    fData.append('img', fileFIeld.current.files[i]);
                }
            }

            const json = await api.addAd(fData);

            if(!json.error){
                history.push(`/ad/${json.id}`);
                return;
            } else {
                setError(json.error);
            }


            

        }else{
            setError(errors.join("\n"));
        }
        setDisabled(false);
        }

        const priceMask = createNumberMask({
            prefix:'R$',
            includeThousandsSeparator:true,
            thousandsSeparatorSymbol:'.',
            allowDecimal:true,
            decimalSymbol:','

        })

        
        
    

    return (
        <PageContainer>
            <PageTitle>Postar um anúncio</PageTitle>
            <PageArea>
                {error && 
                <ErrorMesssage>{error}</ErrorMesssage>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Titulo</div>
                        <div className="area--input">
                            <input 
                            type="text" 
                            disabled={disabled}
                            value={title}
                            onChange={e=>setTitle(e.target.value)}
                            required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Categoria</div>
                        <div className="area--input">
                           <select
                           disabled={disabled}
                           onChange={e=>setCategory(e.target.value)}
                           required
                           >
                               <option></option>
                               {categories && categories.map(i=>
                                <option key={i._id} value={i._id}>{i.name}</option>
                                )}
                           </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Preço</div>
                        <div className="area--input">
                            <MaskedInput
                            mask={priceMask}
                            placeholder="R$ "
                            disabled={disabled || priceNegotiable}
                            value={price}
                            onChange={e=>setPrice(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Preço Negociável</div>
                        <div className="area--input">
                            <input 
                            type="checkbox"
                            disabled={disabled}
                            checked={priceNegotiable}
                            onChange={e=>setPriceNegotiable(!priceNegotiable)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Descrição</div>
                        <div className="area--input">
                           <textarea 
                           disabled={disabled}
                           value={desc}
                           onChange={e=>setDesc(e.target.value)}   
                           ></textarea>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Imagens "1 ou mais"</div>
                        <div className="area--input">
                            <input 
                            type="file"
                            disabled={disabled}
                            ref={fileFIeld}
                            multiple
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled} >Adcionar Anúncio</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>

    )
}

export default Page;