import React from 'react';
import './App.css';
import SimpleTable from './table/Table'
import DataJson from './data/Test-trading-hours';
let rows=[];
class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {rows: rows}
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
  }

  handleCheckBoxChange(){
    let filteredArray=[];
    let chBox = document.getElementById('open');
    if(chBox.checked){
      for (let i=0; i<rows.length;i++){
        if (rows[i].open === 'open now'){
          filteredArray.push(rows[i]);
        }
      }
    }
    this.setState({rows: filteredArray});
  }

  render(){
    return (

      <div className="App">
        {getData()}
        <header className="fixed">
          <div className="header">

            <div>Instrument Name</div><div>Open From</div><div>Open To</div><div>Open Now</div>
            <div>filter<input type="checkbox" id="open" onChange={this.handleCheckBoxChange}/></div>
          </div>
        </header>
       <SimpleTable rows={this.state.rows} />
      </div>
    );

    function getData() {
      for (let i = 0; i < DataJson.length;i++){
        for (let j = 0; j < DataJson[i].tradingHours.length; j++){
            rows.push(createData((DataJson[i].instrumentID*10+i)*10+j, // key index
            DataJson[i].name,
              format(DataJson[i].tradingHours[j].from),
              format(DataJson[i].tradingHours[j].to),
              isOpen(format(DataJson[i].tradingHours[j].from), format(DataJson[i].tradingHours[j].to))
              ));
        }
      }
    }
    function createData(id, name, from, to, open) {
      return {id, name, from, to, open };
    }
    function open() {
      let filteredArray=[];
      let chBox = document.getElementById('open');
      if(chBox.checked){
        for (let i=0; i<rows.length;i++){
          if (rows[i].open === 'open now'){
            filteredArray.push(rows[i]);
          }
        }
      }
      return filteredArray;
    }

    function format(dataToFormat) {
      let date = new Date(dataToFormat*1000);
      let hours = '' + date.getHours();
      if (hours.length < 2){
        hours = "0" + date.getHours()
      }
      let minutes = "0" + date.getMinutes();
      return hours + ':' + minutes;
    }
    function isOpen(from, to) {
      let hourNow = new Date();
      let res = '';
      if (( (hourNow.getHours()-from.slice(0,2) ) > 0 ) && ( (hourNow.getHours()-to.slice(0,2) ) < 0 )){
        res = "open now"
      }
      return res;
    }
  }
}
export default App;
