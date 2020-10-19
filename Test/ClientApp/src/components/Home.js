import React from 'react';
import { useHistory } from 'react-router-dom'
import BgReview from '../images/bg.svg'

export default () => {
  const history = useHistory();
  const handleStart = () =>{
    history.push(`/form-survey`);
  }
  
    return (
      <section className='home'>
        <h1>ĐÁNH GIÁ CHẤY LƯỢNG DỊCH VỤ</h1>
        <p>Khảo sát dịch vụ tại ALT IELTS gia sư</p>
        <button class="button" onClick={()=> handleStart()}><span>Bắt đầu </span></button>
        <section className='layout__main'>
          <img src={BgReview} alt="bg-reviews" />
        </section>
      </section>
    );
}
