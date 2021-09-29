import React from 'react'

import { Page } from 'src/components/layouts'
import { GoBack } from 'src/features/HistoryReferrer'

export const About: React.FC = () => {
  return (
    <Page title="About">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        possimus doloribus error cumque autem asperiores, ullam deserunt quidem
        omnis doloremque itaque eius eaque sint facilis unde tenetur reiciendis
        aliquam soluta?
      </p>
      <GoBack className="btn" cy-data="go-back-button">
        Go back
      </GoBack>
    </Page>
  )
}
