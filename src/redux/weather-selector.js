export const getCards=(state)=>{
    let min_temp,max_temp,dayOfWeek,dayNumber,itr=0;
    let description=[]
    let objData=[];

    const PushData=(i)=>{
        objData.push({dayOfWeek,
            min_temp:state.weatherPage.weatherInfo[i].min_t,
            max_temp:state.weatherPage.weatherInfo[i].max_t,
            month:state.weatherPage.weatherInfo[i].month,
            day:dayNumber,
            urlIcon:state.weatherPage.weatherInfo[i].urlIcon,
            description,
            paginationNumber:itr+1
        });
        min_temp=null;
        max_temp=null;
        itr++;
    };
    const PushDescription=(i)=>{
        const degreePerDirection = 360 / 8;
        const offsetAngle = state.weatherPage.weatherInfo[i].wind.degree + degreePerDirection / 2;

        description.push({
            
            t_main:state.weatherPage.weatherInfo[i].main_t,
            t_feels_like:state.weatherPage.weatherInfo[i].t_feels_like,
            pressure:state.weatherPage.weatherInfo[i].pressure,
            humidity:state.weatherPage.weatherInfo[i].humidity,

            wind:{direction:(offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection) ? "N"
            : (offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection) ? "NE"
              : (offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection) ? "E"
                : (offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection) ? "SE"
                  : (offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection) ? "S"
                    : (offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection) ? "SW"
                      : (offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection) ? "W"
                        : "NW",
                speed:state.weatherPage.weatherInfo[i].wind.speed},
            time:state.weatherPage.weatherInfo[i].time,
            urlIcon:state.weatherPage.weatherInfo[i].urlIcon
        })}
    
    for(let i=0;i<state.weatherPage.weatherInfo.size;i++){
        PushDescription(i);
        if(dayOfWeek!==state.weatherPage.weatherInfo[i].dayOfWeek)
        {

            dayOfWeek=state.weatherPage.weatherInfo[i].dayOfWeek;
            min_temp=state.weatherPage.weatherInfo[i].min_t;
            max_temp=state.weatherPage.weatherInfo[i].max_t;
            dayNumber=state.weatherPage.weatherInfo[i].day;
        }
        if(dayOfWeek===state.weatherPage.weatherInfo[i].dayOfWeek)
        {
            if(min_temp>state.weatherPage.weatherInfo[i].min_t)
            {
                min_temp=state.weatherPage.weatherInfo[i].min_t;
            }
            if(max_temp<state.weatherPage.weatherInfo[i].max_t)
            {
                max_temp=state.weatherPage.weatherInfo[i].max_t;
            }
        }
        if(i===state.weatherPage.weatherInfo.size-1)
        {
            PushData(i);
            description=[];break;
        }
        if(dayOfWeek!==state.weatherPage.weatherInfo[i+1].dayOfWeek)
        {
            PushData(i);
            description=[];
        }
    }

        return objData
}