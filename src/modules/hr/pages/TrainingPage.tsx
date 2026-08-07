import PageContainer

from "../../../components/ui/PageContainer";

import TrainingHeader

from "../components/TrainingHeader";

import TrainingOverview

from "../components/TrainingOverview";

import CreateTrainingButton

from "../components/CreateTrainingButton";

import TrainingForm

from "../components/TrainingForm";

import TrainingSearch

from "../components/TrainingSearch";

import TrainingTable

from "../components/TrainingTable";

import TrainingCount

from "../components/TrainingCount";

import {

useLoadTrainingCourses

}

from "../hooks/useLoadTrainingCourses";

export default function TrainingPage(){

useLoadTrainingCourses();

return(

<PageContainer>

<div className="space-y-8">

<TrainingHeader/>

<TrainingOverview/>

<CreateTrainingButton/>

<TrainingForm/>

<TrainingSearch/>

<TrainingTable/>

<TrainingCount/>

</div>

</PageContainer>

);

}