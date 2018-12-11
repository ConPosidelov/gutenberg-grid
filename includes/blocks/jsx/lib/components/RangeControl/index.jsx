/**
 * External dependencies
 */
import { isFinite , times  } from 'lodash';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { BaseControl, Button, Dashicon, IconButton } = wp.components;
const { Component, Fragment } = wp.element;
const { withInstanceId } = wp.compose;


/**
 * Internal dependencies
 */
import './style.scss';



const RangeControl = ({
  instanceId,
  className,
  value,
  onChange,
  scale,
  trackFill,
  label,
 
  ...props
}) => {
  const { min, max } = props;
  

  const resetValue = () => onChange();
  const onChangeValue = ( event ) => {
    const newValue = event.target.value;
    if ( newValue === '' ) {
      resetValue();
      return;
    }
    onChange( Number( newValue ) );
  };

  const initialSliderValue = isFinite( value ) ? value : min || 0;

  let scaleMin,
      scaleMax,
      scalePoint,
      divisionsStepScale;
  if(scale){ 
    scaleMin = scale.scaleMin || Math.round(min) || 0;
    scaleMax = scale.scaleMax || Math.round(max) || 1;
    scalePoint = scale.scalePoint || 'start-end';
    divisionsStepScale = scale.divisionsStepScale || 1;
  }

  const divisionsNumber = Math.round((scaleMax - scaleMin) / divisionsStepScale);

  const scaleInner = times(divisionsNumber, index => {
      const point = scaleMin + (index + 1) * divisionsStepScale;
      return (
        <div 
          key={`${instanceId}-divisions-${index}`} 
          className={'slider_scale-divisions'} 
          style={{
            width: `${100 / divisionsNumber}%`
          }}
        >
          { !index && <div className={'slider_scale-before-first-point'}>{scaleMin}</div> }
          <div className={'slider_scale-after-point'}>{point}</div>  
        </div>
      )
  });


  const widthFill = 100 * (value - min) / (max - min);
  const trackFillStyle = {
    width: `${widthFill}%`
  };
    


  return (
    <BaseControl
      className={ classnames( 'ps_components-range-control', className ) } 
      label={label}
    >
      <input
        className="ps_components-range-control__slider"
        type="range"
        value={ initialSliderValue }
        onChange={ onChangeValue }
        
        { ...props }
      />
      { scale && (
        <div className={'slider_scale'}>
          {scaleInner}         
        </div>
      )}
      { trackFill &&
        (<div className={'slider_extra-track'} style={trackFillStyle}></div>)
      }
      
    </BaseControl>
  )  

};


export default withInstanceId(RangeControl);

