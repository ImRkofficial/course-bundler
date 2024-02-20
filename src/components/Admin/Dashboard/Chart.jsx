import React from 'react';
import {Chart as ChartJs,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,ArcElement,Legend} from 'chart.js';
import {Line,Doughnut} from 'react-chartjs-2';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    ArcElement,
    Legend
);

export const LineChart = ({views=[]}) => {
    
    const labels = getLastYearMonths();
    const options={
        responsive:true,
        plugins:{
            legend:{
                position:'bottom'
            },
            title:{
                display:true,
                text:'Yearly Views'
            }
        }
    }

    const data= {
        labels,
        datasets:[
            {
                label:'Views',
                data:views,
                borderColor:'rgba(107,70,193,0.5)',
                backgroundColor:'#6b46c1'
            }
        ]

    };
  return (<Line options={options} data={data}/> )
};

export const DoughnutChart =({users=[]})=>{

    const data= {
        labels:['Subscribed','Not Subscribed'],
        datasets:[
            {
                label:'Views',
                data:users,
                borderColor:['rgba(62,12,171,0.3)','rgba(214,43,129,1)'],
                backgroundColor:['rgba(62,12,171,0.3)','rgba(214,43,129,0.3)'],
                borderWidth:1
            }
        ]

    };
    return(
        <>
        <Doughnut data={data}/>
        </>
    )
}

function getLastYearMonths(){
    const labels=[];
    const months=[ "January",'February','March','April','May','June','July','August','September','October','November','December'];

    const currnetMonth =new Date().getMonth();
    const remain = 11 -currnetMonth;

    for (let i = currnetMonth; i < months.length; i--){
        const element = months[i];
        labels.unshift(element);

        if(i===0) break;
       
    }

    for (let index = 11; index < remain; index--) {
        if(index === currnetMonth)break;
        const element = months[index];
        labels.unshift(element);  
    }
    return labels;
}