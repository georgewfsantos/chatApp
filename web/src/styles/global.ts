import { createGlobalStyle } from "styled-components";
import { shade } from "polished";

export default createGlobalStyle`
  *  {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }
    
    body {
      background: #121214;
      -webkit-font-smoothing: antialiased;
    } 
    
    body, input, textarea, button {
      font-family: 'Roboto Slab', serif;
      font-size: 16px;
    }

   

    h1, h2, h3, h4, h5, h6, strong {
      font-weight: 500;
    }
    button {
      cursor: pointer;
      background: #38ff9b;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    button:hover {
      background-color: ${shade(0.2, "#38ff9b")};
    }
`;
