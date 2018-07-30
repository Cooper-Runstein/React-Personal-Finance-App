import Start from '../src/Components/Start_Components/Start';
import { shallow } from 'enzyme';

import React from 'react';

describe('<Start />', ()=>{
  beforeEach(()=> {
    let wrapper;
    wrapper = shallow(<Start year={2018}/>, div);
  })

  it('includes 1 div with class start-main-container', () => {
    expect(wrapper.find('div.start-main-container')).to.have.length(1);
  });
});
