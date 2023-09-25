import { LabelsChart } from "../cmps/LabelsChart"
import { SalesPerMonth } from "../cmps/salesPerMonthChart"

export function DashBoard () {
    return(<section className="charts">
<LabelsChart/>
<SalesPerMonth/>
    </section>)
}