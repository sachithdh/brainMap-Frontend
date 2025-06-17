import React from 'react';

interface CardProps {
  image: string;
  text: string;
}

const Card_1: React.FC<CardProps> = ({ image, text }) => {
  return (
    <div className='card-1 shadow-[var(--my-shadow)]'>
      <div className='w-20 h-20 text-center'>
        <img src={image} alt={text} />
        <p className='pt-2 font-sans font-semibold'>{text}</p>
      </div>
    </div>
  );
};

export default Card_1;
