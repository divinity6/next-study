'use client';
import {useRef, useState} from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({label, name}) {

  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {

    const file = event.target.files[0];
    if (!file) {
      setPickedImage( null );
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = (url) => {
      // 생성된 url 을 state 에 저장
      setPickedImage(fileReader.result);
    }
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>이미지가 아직 선택되지 않았습니다.</p>}
          {pickedImage && <Image src={pickedImage} alt="유저가 선택한 image" fill /> }
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}>
          사진을 고르세요
        </button>
      </div>
    </div>
  );
}