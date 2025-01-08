import styles from './CityList.module.css'
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';

import {useCities} from "../contexts/CitiesContext";
// check prop-types of cities, isLoading to get rid of the error through by es-lint. Although code and build works fine.

function CityList(){
    const {cities, isLoading} = useCities();
    if(isLoading)
        return <Spinner />;
    if(!cities.length)
        return <Message message='Add your first city by clicking on a city on the map'/>
    return (
        <ul className={styles.cityList}>
            {cities.map(city => <CityItem city={city} key={city.id} />)}
        </ul>
    );
}

export default CityList;