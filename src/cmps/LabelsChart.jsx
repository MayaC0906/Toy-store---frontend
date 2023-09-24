import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { loadToys } from "../store/actions/toy.actions";


export function LabelsChart() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const [labelsArr, setLabelsArr] = useState([])
    const [avgPrices, setAvgPrices] = useState([])
    const [data, setData] = useState(undefined)

    useEffect(()=>{
        loadToys()
        .catch(err => {
            console.log('err:', err)
        })
    },[])

    console.log('labelsArr:', labelsArr, 'avgPrices', avgPrices);

    useEffect(() => {
        let labelsPrices = {}
        toys.forEach(toy => {
            toy.labels.forEach(label => {
                if (labelsPrices[label]) {
                    labelsPrices[label].push(toy.price)
                } else {
                    labelsPrices[label] = [toy.price]
                }
            })
        })

        setLabelsArr([])
        setAvgPrices([])
        for (const label in labelsPrices) {
            setLabelsArr(prevLabelsArr => [...prevLabelsArr, label])
            let nums = labelsPrices[label]
            const avgPrice = calculateAverage(nums)
            setAvgPrices(prevAvgPrices => [...prevAvgPrices, avgPrice])
        }
    }, [toys])

    function calculateAverage(nums) {
        if (nums.length === 0) {
            return 0
        }

        const sum = nums.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

        const average = sum / nums.length;
        return Math.round(average)
    }

    ChartJS.register(ArcElement, Tooltip, Legend);
    useEffect(() => {
        setData({
            labels:  labelsArr ,
            datasets: [
                {
                    label: 'Avarege price per label',
                    data: avgPrices ,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(50, 170, 64, 0.2)',
                        'rgba(150, 130, 10, 0.2)',
                        'rgba(75, 100, 50, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(50, 170, 64, 1)',
                        'rgba(150, 130, 10, 1)',
                        'rgba(75, 100, 50, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        })
    }, [avgPrices, labelsArr])

    return (
        <div>
          {data && (
            <section style={{ maxWidth: '60vw', margin: 'auto' }}>
              <Doughnut data={data} />
            </section>
          )}
        </div>
      );
      
}



