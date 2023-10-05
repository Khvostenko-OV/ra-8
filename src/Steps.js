import { useState } from 'react';

export default function Steps() {
  const now = new Date();
  const [state, setState] = useState({days:[], date:now.toLocaleDateString('en-CA'), dist:''});

  const onChange = ({target}) => {
    const { value, name } = target;
    setState(prevState => ({...prevState, [name]: value}));
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    const dist = parseFloat(state.dist);
    if (!isNaN(dist)) {
      const days = state.days.slice();
      const pos = days.reduce((acc, item, index) => item.date === state.date? index : acc, -1);
      if (pos >= 0) {
        days[pos].dist += dist
      } else {
        days.push({date: state.date, dist: dist});
        days.sort((a,b) => a.date > b.date? -1 : 1)
      }
      setState(prevState => ({...prevState, days: days, dist: ''}));
    }
  }

  const onEdit = ({target}) => {
    const pos = target.getAttribute('data-pos');
    const days = state.days.slice();
    const dist = days[pos].dist
    days[pos].dist = 0;
    setState(prevState => ({days: days, date: days[pos].date, dist: dist}));
  }

  const onDelete = ({target}) => {
    const pos = target.getAttribute('data-pos');
    const days = state.days.slice();
    days.splice(pos,1);
    setState(prevState => ({...prevState, days: days}));
  }

  return (
    <div className='body'>
      <form className='form' onSubmit={onSubmit}>
        <label>Дата (ДД.ММ.ГГГГ)
          <input className='input' name='date' type='date' value={state.date} onChange={onChange} required/>
        </label>
        <label>Пройдено км
          <input className='input' name='dist' value={state.dist} onChange={onChange} required/>
        </label>
        <button className='button' type='submit'>OK</button>
      </form>

      <div className='day'>
        <div className='date'>Дата (ГГГГ-ММ-ДД)</div>
        <div className='dist'>Пройдено км</div>
        <div>Действия</div>
      </div>

      <div className='day-list' style={{display: state.days.length? 'block' : 'none'}}>
        {state.days.map((day, index) =>
          <div key={day.date} className='day'>
            <div className='date'>{day.date}</div>
            <div className='dist'>{day.dist}</div>
            <div className='btn' data-pos={index} onClick={onEdit}>✎</div>
            <div className='btn' data-pos={index} onClick={onDelete}>✘</div>
          </div>
        )}
      </div>
    </div>
  );
}