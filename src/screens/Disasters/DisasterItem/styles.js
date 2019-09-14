import Styled from 'styled-components';

export const Wrapper = Styled.div`
    display: inline-block;
    padding: 10px;
    background: #fff;
    max-width: 360px;
    border-radius: 20px;
    margin: 20px 10px;
    
    width: 250px;
    height: 100px;
    text-align: center;
    vertical-align: middle;

    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: .3s all;
    &:hover {
        box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.1);
        border: 1px solid transparent;
    }


`;
