import { Calendar, dayjsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from 'dayjs'
import EventNoteIcon from '@mui/icons-material/EventNote';
import './Calendar.css'
import { useAdmin } from "../../context/AdminContext";
import { useEffect, useState } from "react";


function MiniPageCalendar() {
  const localizer = dayjsLocalizer(dayjs)

  const [events, setEvents] = useState([
    /* {
      start: dayjs('2024-09-24T12:00:00').toDate(),
      end: dayjs('2024-09-24T13:00:00').toDate(),
      title: "Evento 1",
      data: 1
    },
    {
      start: dayjs('2024-09-25T12:00:00').toDate(),
      end: dayjs('2024-09-27T13:00:00').toDate(),
      title: "Evento 2",
      data: 3
    } */
  ])

  const {getPromociones, promos} = useAdmin();

function getPromostoCalendar(){
  if (promos.length > 0) {
    const newEvents = [...events];
    promos.forEach((promo, index) => {
      newEvents[index] = {
        start: dayjs(promo.date).toDate(),
        end: dayjs(promo.date).add(promo.duration, 'day').toDate(),
        title: `${promo.descuento} ${promo.producto}`,
        data: promo.duration,
      };
    });
    setEvents(newEvents);
  }
}
    
  
  useEffect(() =>{
    getPromociones()
    getPromostoCalendar()
  }, [])



  function coloresValor(data) {
    
    var color= '#ad3832';

    if(data>=7){
      color = '#327bad'
    }else{
      if (data>=3) {
        color = '#32ad57'
      }
    }

    return color
  }

  const components = {
    event: (props) => {
      const {data} = props.event;
      var propColor=coloresValor(data);

      return <div  className="py-1 px-0.5 rounded" style={{backgroundColor: propColor}}>
        <EventNoteIcon/>
        {props.title}
      </div>
    }
  }

  const today = new Date()

  return (
    <div style = {{
      height: "60vh",
      width: "60vw",
    }}>
      <Calendar 
      localizer = {localizer}
      events = {events}
      views = {["month"]}
      /* view = {"month"} */
      defaultDate = {dayjs(today).toDate()}
      formats = {{
        dayHeaderFormat: date => {
          console.log(date);
          return dayjs(date).format("DD/MM/YYYY");
        }
      }}
      components = {components}
      />
    </div>
  )
}

export default MiniPageCalendar