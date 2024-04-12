import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './IconShower.module.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

function IconShower() {
  const [iconNames, setIconNames] = useState([])
  const [expectedIcon, setExpectedIcon] = useState(null)
  library.add(fas)
  let iconKeys = Object.keys(fas);

  //if expectedIcon value was changed, then iconNames array receive this one right away
  useEffect(() => {
    if (expectedIcon) {
      setIconNames([...iconNames, expectedIcon])
    }
  }, [expectedIcon])

  //create closure for remember unique randomKey for every click
  function createIconGetter() {
    return function() {
      let randomKey = iconKeys[Math.floor(Math.random() * iconKeys.length)];

      return (() => {
        setTimeout(() => {
          let icon = fas[randomKey];
          setExpectedIcon(icon.iconName); //change expectedIcon and trigger useEffect
        }, 3000)
      })()
    }
  }
  const getIcon = createIconGetter();

  return (
    <div className={styles.shower}>
      <button className={styles.button} onClick={getIcon}>Get icon</button>
      <div className={styles.icons}>
        {iconNames.length ?
          iconNames.map((icon, index) => {
            return <FontAwesomeIcon key={index} icon={`fa-solid fa-${icon}`} />
          }) :
          <p>No icon yet</p>
        }
      </div>
    </div>
  )
}

export default IconShower