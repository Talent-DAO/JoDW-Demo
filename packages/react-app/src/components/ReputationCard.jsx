import React from "react";

const ReputationCard = ({data, showTitle}) => {

  return (
    <div className="flex flex-row rounded-md border border-gray p-4 mb-8" style={{backgroundColor: "#FCFCFC"}}>

      <div className="flex flex-col text-left px-4 w-full">
        {showTitle ? (<div className="flex flex-row">
          <div className="font-bold text-lg">Connections</div>

          <div className="text-xl text-darkgrey ml-1 flex items-center">
 
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"  >
              <path d="M12 6C12 7.5913 11.3679 9.11742 10.2426 10.2426C9.11742 11.3679 7.5913 12 6 12C4.4087 12 2.88258 11.3679 1.75736 10.2426C0.632141 9.11742 0 7.5913 0 6C0 4.4087 0.632141 2.88258 1.75736 1.75736C2.88258 0.632141 4.4087 0 6 0C7.5913 0 9.11742 0.632141 10.2426 1.75736C11.3679 2.88258 12 4.4087 12 6ZM4.122 4.52475H4.74075C4.84425 4.52475 4.92675 4.44 4.94025 4.33725C5.00775 3.84525 5.34525 3.48675 5.94675 3.48675C6.46125 3.48675 6.93225 3.744 6.93225 4.36275C6.93225 4.839 6.65175 5.058 6.2085 5.391C5.70375 5.75775 5.304 6.186 5.3325 6.88125L5.33475 7.044C5.33554 7.09321 5.35564 7.14013 5.39072 7.17465C5.4258 7.20916 5.47304 7.22851 5.52225 7.2285H6.1305C6.18023 7.2285 6.22792 7.20875 6.26308 7.17358C6.29825 7.13842 6.318 7.09073 6.318 7.041V6.96225C6.318 6.42375 6.52275 6.267 7.0755 5.84775C7.53225 5.5005 8.0085 5.115 8.0085 4.30575C8.0085 3.1725 7.0515 2.625 6.00375 2.625C5.0535 2.625 4.0125 3.0675 3.94125 4.3395C3.94022 4.36372 3.94416 4.3879 3.95282 4.41054C3.96149 4.43318 3.97469 4.45381 3.99162 4.47116C4.00855 4.48851 4.02885 4.50222 4.05127 4.51143C4.07369 4.52065 4.09776 4.52518 4.122 4.52475ZM5.86575 9.357C6.32325 9.357 6.6375 9.0615 6.6375 8.66175C6.6375 8.24775 6.3225 7.95675 5.86575 7.95675C5.42775 7.95675 5.109 8.24775 5.109 8.66175C5.109 9.0615 5.42775 9.357 5.8665 9.357H5.86575Z" fill="black" fillOpacity="0.3"/>
            </svg>

          </div>
        </div>) : (<></>)}
        
        <div className="flex flex-row">
          {
            Object.keys(data).map((item, index) => {
              return (
                <div key={index} className="w-1/3 ">
                  <div className="font-semibold place-items-center flex justify-center" style={{fontSize: "64px", color: "#090909"}}>
                    {data[item]}
                  </div> 
                  <div className="text-sm text-darkgrey flex justify-center">{item}</div>
                </div>
              );
            })
          }
          
        </div>
      </div>

    </div>
  );
};

export default ReputationCard;
