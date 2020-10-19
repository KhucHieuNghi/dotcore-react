import React, { useState, useRef } from 'react';
import axios from 'axios';
import BeautyStars from 'beauty-stars';
import { Alert } from 'reactstrap';
//SVG
import ILogin from "../images/log-in.svg";
import IEye from "../images/eye.svg";
import ICEye from "../images/close-eyes.svg";
import IClean from "../images/clean.svg";
import IGuard from "../images/guard.svg";
import IEmployee from "../images/employee.svg";

const arrServices = [
  { id: 1, name: 'Vệ sinh', img: IClean, title: '<b>Bạn thấy lớp học, Văn phòng ALT IELTS Gia sư có <span class=key-id>Sạch sẽ</span> không?</b>' },
  { id: 2, name: 'Bảo vệ', img: IGuard, title: '<b>Bạn có hài lòng với dịch vụ <span class=key-id>Bảo vệ</span> của gia sư không?</b>' },
  { id: 3, name: 'Chăm sóc học viên', img: IEmployee, title: '<b>Bạn thấy lớp học, Văn phòng ALT IELTS Gia sư có <span class=key-id>Sạch sẽ</span> không?</b>' }
]


const styleImgLogin = {
  width: '60px'
}

const WrapperLogin = {
  textAlign: 'center',
  color: '#FFF',
  margin: '70px 0'
}

const styleEye = {
  position: 'absolute',
  width: '28px',
  right: '0',
  bottom: '5px',
}

const styleMessValidate = {
  visibility: 'hidden',
  color: '#fff',
  fontSize: '17px',
  position: 'relative'
}

const styleImageService = {
  width: '100px',
}

const styleButton = {
  background: 'rgb(219, 85, 102)',
  width: '100%'
}

export default () => {
  const [isShowPw, setIsShowPw] = useState(false);
  const [chooseService, setChooseService] = useState();
  const [showValidate, setShowValidate] = useState(false);
  const [step, setStep] = useState(false);
  const [rating, setRating] = useState(0);
  const [Oke, setOke] = useState(false);
  const textPw = useRef();
  const textRv = useRef();

  const handleSubmitPassword = async () => {
    try {
      if (!textPw.current.value || !chooseService) {
        setShowValidate(true)
        return;
      }
      const data = {
        Pass: textPw.current.value,
      };
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'Accept': 'application/json' },
        data: JSON.stringify(data),
        url: '/FormApi',
      };

      const result = await axios(options);
      if (!result.data) {
        setShowValidate(true)
        return;
      }
      setStep(result.data)
      setShowValidate(false)
    } catch {
      setShowValidate(true)
    }
  }

  const handleSubmitRating = async () => {
    try {
      if (!rating) {
        setShowValidate(true)
        return;
      }
      const data = {
        Id: chooseService,
        Name: arrServices.find(service => service.id === chooseService).name,
        Rating: rating,
        Detail: textRv.current.value
      };
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'Accept': 'application/json' },
        data: JSON.stringify(data),
        url: '/Reviews',
      };
      await axios(options);
      setOke(true)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } catch {
      setShowValidate(true)
    }
  }

  return (
    <>
      {
        Oke && <Alert color="primary">
          Gửi thành công
     </Alert>
      }
      {step ? <StepTwo
        chooseService={chooseService}
        showValidate={showValidate}
        textPw={textPw}
        handleSubmitRating={handleSubmitRating}
        rating={rating}
        setRating={setRating}
        textRv={textRv}
        Oke={Oke}
      ></StepTwo> :
        <StepOne
          isShowPw={isShowPw}
          setIsShowPw={setIsShowPw}
          chooseService={chooseService}
          setChooseService={setChooseService}
          showValidate={showValidate}
          setShowValidate={setShowValidate}
          textPw={textPw}
          handleSubmitPassword={handleSubmitPassword}
        ></StepOne>
      }
    </>
  )
}

const StepTwo = ({ chooseService, showValidate, rating,
  setRating, handleSubmitRating, Oke, textRv }) => {
  {
    return <section>
      <section className='home'>
        <h1>ĐÁNH GIÁ CHẤY LƯỢNG DỊCH VỤ</h1>
        <p>Bạn đang đánh giá chi nhánh <b>Phan Chu Trinh</b></p>
      </section>
      <form className='step2'>
        <section className='title' dangerouslySetInnerHTML={{ __html: arrServices.find(service => service.id === chooseService).title }} />
        <BeautyStars
          value={rating}
          onChange={value => setRating(value)}
        />
        <div className='mess-validate' style={{ ...styleMessValidate, color: '#C01E31', visibility: showValidate ? 'unset' : 'hidden' }}>Chưa đánh giá</div>
        <textarea ref={textRv} placeholder="Xin cho biết ý kiến của bạn để chúng tôi cải thiện tốt hơn"></textarea>
        <button type='button'
          class="button" style={{ background: 'rgb(219, 85, 102)', width: '100%' }} onClick={() => handleSubmitRating()}><span>Gửi </span></button>
      </form>
    </section>
  }
}

const StepOne = ({ isShowPw, setIsShowPw, chooseService, setChooseService, setShowValidate, showValidate,
  textPw, handleSubmitPassword }) => {
  const GrLogin = () => (<section className='lg__login' style={WrapperLogin}>
    <img src={ILogin} alt="logo login" style={styleImgLogin} />
    <section style={{ fontWeight: 'bold', marginTop: '30px', fontSize: '30px' }}>Đăng nhập</section>
  </section>)

  const GrPw = () => <section className='gr__password'>
    <label for="inp" class="inp">
      <input type={isShowPw ? 'text' : 'password'} ref={textPw} id="inp" placeholder="&nbsp;" />
      <span class="label">Password</span>
      <img src={isShowPw ? ICEye : IEye} alt="logo eye" style={styleEye} onClick={() => setIsShowPw(!isShowPw)} />
    </label>
    <div className='mess-validate' style={{ styleMessValidate, visibility: showValidate ? 'unset' : 'hidden' }}>Vui lòng kiểm tra lại mật khẩu hoặc kiểm tra dịch vụ đã chọn</div>
  </section>

  const ItemImg = (service) => (<div className='service__item' key={`item ${service.id}`}
    onClick={() => setChooseService(chooseService === service.id ? undefined : service.id)}
    style={{ background: chooseService === service.id && '#fff' }}>
    <img className='img'
      style={{
        ...styleImageService,
        filter: chooseService === service.id && 'invert(30%) sepia(29%) saturate(7074%) hue-rotate(336deg) brightness(74%) contrast(105%)'
      }}
      src={service.img} alt={`logo ${service.name}`} />
    <div className='service__name' style={{ color: chooseService === service.id && '#C01E31' }}>{service.name}</div>
  </div>)

  const GrService = () => <section className='gr__service'>
    <div className='service__title'>Chọn loại dịch vụ</div>
    <div className='service__container'>
      {
        arrServices.map(service => ItemImg(service))
      }
    </div>
  </section>

  return <form>
    <GrLogin />
    <GrPw />
    <GrService />
    <button type='button' class="button" style={styleButton} onClick={() => handleSubmitPassword()}><span>Bắt đầu đánh giá </span></button>
  </form>
}