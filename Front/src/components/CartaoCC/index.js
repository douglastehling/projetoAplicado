import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cards from "react-credit-cards";
import { toast } from "react-toastify";

import { formatPrice } from "~/util/format";

import { format, addMonths, addDays } from "date-fns";

import { Form, Input, Select } from "@rocketseat/unform";

import { Wrapper } from "./styles";
import {
  Container,
  Row,
  Col,
  Alert,
  Button,
  InputGroup,
  Spinner,
  Modal,
  Card,
  Badge,
} from "react-bootstrap";
import InputMask from "react-input-mask";

import { FiCheck } from "react-icons/fi";
import Switch from "react-switch";

import api from "~/services/api";

export default function CartaoCC({ total = 0.0, setPayed }) {
  const [body, setBody] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
    price: total,
    installments: 1,
  });

  const [loading, setLoading] = useState(false);

  async function handlePay(e) {
    setPayed(true);
    /* let dateExpiry = expiry.trim().split("/");

    dateExpiry[1] =
      Number(dateExpiry[1]) < 2000
        ? Number(dateExpiry[1]) + 2000
        : Number(dateExpiry[1]);

    const newDateExpiry = dateExpiry.join("/");

    const jsonData = {
      DonationPageId: idclient,
      GiverName: donorName,
      GiverEmail: donorMail,
      Value: Number(price),
      IsRecurrence: typeDonation === "mensal" ? true : false,
      RecurrenceTimes: installments,
      AnonymousDonator: identificacao,
      PaymentMethodCode: 50,
      PaymentParameters: JSON.stringify({
        isSignature: typeDonation === "mensal" ? true : false,
        signatureInterval: typeDonation === "mensal" ? "Monthly" : "",
        signatureEndDate:
          typeDonation === "mensal"
            ? format(
                addDays(addMonths(Date.now(), installments - 1), 1),
                "yyyy-MM-dd"
              )
            : "",
        card_number: number.trim().replace(/\s/g, ""),
        full_name: name.trim(),
        validate: newDateExpiry,
        secure_code: cvc.trim(),
        recurrent: false,
        installment: 1,
        country: "BRA",
      }),
    };

    try {
      setLoading(true);
      const response = await api.post(`${routePay}`, jsonData);
      const dataResponse = response.data;
      //console.log(dataResponse);

      if (response.status === 200) {
        dataResponse.status
          ? emitCallBack({ status: true, entity: dataResponse.entity })
          : error(dataResponse.message);
      } else {
        error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Ocorreu um erro, tente novamente");
    } finally {
      setLoading(false);
    } */
  }

  return <Wrapper></Wrapper>;
}
