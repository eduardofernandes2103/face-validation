import ticketsController from "@/server/controller/tickets/tickets-controller"
import { FreeTicketsErrorResponse, FreeTicketsInterface, FreeTicketsSuccessResponse } from "@/server/model/tickets/tickets.model";
import { useEffect, useState } from "react";
import styles from './styles.module.scss';
import Button from "@/components/button";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useMobile } from "@/hooks/useMobile";
import RedirectToMobile from "@/components/redirectToMobile";

export default function ProducerTickets(){
  const isMobile = useMobile();
  const router = useRouter();

  const [freeTickets, setFreeTickets] = useState<any>();

  const getFreeTickets = async (token: string | null) => {
    await ticketsController.getFreeTickets(`${token}`).then((res) => {
      setFreeTickets(res?.response["free-tickets"])
    }).catch((err) => console.error(err))
  }

  const handleRedirectToCreateTickets = () => {
    router.push('/create-tickets')
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    getFreeTickets(token);
  }, [])
  
  return(
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>Lista de cortesias</h2>
          <span>Cortesias geradas: {freeTickets?.length}</span>
          <div className={styles.buttonWrapper}>
            <Button isDefault onClick={() => handleRedirectToCreateTickets()}>Gerar cortesia</Button>
          </div>
          {freeTickets && (
            <div>
              {freeTickets?.map((ticket: any, index: any) => (
                <div key={index} className={styles.ticket}>
                  <p>{ticket.client_name}</p>
                  {ticket.is_approved === true && (
                    <FontAwesomeIcon icon={faCircleCheck} className={styles.icon} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <RedirectToMobile isDesktop={isMobile === false && true} />
    </>
  )
}