// Filename: button/index.js
// Description: This file implements the button component used throughout
// the project.
//
// 2021-11-22
//
// Lokel LLC.
//
// any part of Lokel can not be copied and/or distributed without the expressed
// permission of a Co-Founder of Lokel LLC.
//
// Copyright (C) 2020-2021 Lokel LLC. All rights reserved.

// Importing tools
import Link from "next/link";

import styles from "./button.module.css"

const Button = ({ link, text }) => {
  return (
    <Link href={link}>
      <div className={styles.container}>
        {text}
      </div>
    </Link>
  )
}

export default Button;
