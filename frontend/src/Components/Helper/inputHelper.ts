import React from 'react';

const inputHelper = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLTextAreaElement
  >,
  data: any
) => {
  const receiveData: any = { ...data };
  receiveData[e.target.name] = e.target.value;
  return receiveData;
};

export default inputHelper;