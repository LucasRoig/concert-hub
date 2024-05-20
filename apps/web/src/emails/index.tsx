import { Body, Column, Container, Font, Head, Heading, Hr, Html, Row, Text, Link } from "@react-email/components";
import * as React from "react";

type EmailProps = {
  events: {
    title: string,
    city: string,
    venue: string,
    date: string,
    isComplet: boolean,
    isCanceled: boolean,
    url?: string
  }[]
}

export default function Email(props: EmailProps) {
  let {events} = props;
  if (!events) {
    events = []
  }
  const now = new Date();
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
        <Body style={main}>
          <Container style={container}>
            <Heading as="h1">Concert Hub</Heading>
            <Text style={subText}>Analyse du {now.toLocaleString("fr-FR")}</Text>
            <Hr style={hr}/>
            <Row>
              <Column>
                <Text style={columnHeader}>Concert</Text>
                {events.map(e => {
                  if (e.url && e.url.length) {
                    return (
                    <Text style={eventTitle}>
                      <Link href={e.url}>{e.title}</Link>
                    </Text>)
                  } else {
                    return (
                      <Text>{e.title}</Text>
                    )
                  }
                })}
              </Column>

              <Column>
                <Text style={columnHeader}>Salle</Text>
                {events.map(e => {
                  if (e.venue.trim().length) {
                    return <Text>{e.venue.trim()}</Text>
                  } else {
                    return <br />
                  }
                })}
              </Column>
              <Column>
                <Text style={columnHeader}>Ville</Text>
                {events.map(e => {
                  if (e.city.trim().length) {
                    return <Text>{e.city.trim()}</Text>
                  } else {
                    return <br />
                  }
                })}
              </Column>
              <Column>
                <Text style={columnHeader}>Date</Text>
                {events.map(e => {
                  if (e.date.trim().length) {
                    return <Text>{e.date.trim()}</Text>
                  } else {
                    return <br />
                  }
                })}
              </Column>
              <Column>
                <Text style={columnHeader}><br/></Text>
                {events.map(e => {
                  if (e.isCanceled) {
                    return <Text style={textDanger}>ANNULÉ</Text>
                  } else if (e.isComplet) {
                    return <Text style={textDanger}>COMPLET</Text>
                  } else {
                    return <br />
                  }
                })}
              </Column>
            </Row>
            <Hr style={hr}/>
          </Container>
        </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 48px 48px",
  marginBottom: "64px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const subText = {
  color: "hsl(240 3.8% 46.1%)",
  fontSize: "0.75rem"
}

const eventTitle = {
  fontWeight: "600"
}

const columnHeader = {
  fontWeight: "600"
}

const textDanger = {
  fontWeight: "800",
  color: "hsl(0 84.2% 48.2%)"
}