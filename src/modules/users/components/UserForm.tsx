import { useState }
from "react";

import Card
from "../../../components/ui/Card";

import Input
from "../../../components/ui/Input";

import Button
from "../../../components/ui/Button";

import { useCreateUser }
from "../hooks/useCreateUser";

export default function UserForm() {

  const {

    create,

  } = useCreateUser();

  const [

    name,

    setName,

  ] = useState("");

  const [

    email,

    setEmail,

  ] = useState("");

  async function save() {

    if (

      !name ||

      !email

    ) {

      return;

    }

    await create(

      name,

      email,

      "sales",

    );

    setName("");

    setEmail("");

  }

  return (

    <Card>

      <div className="space-y-4">

        <Input

          label="Name"

          value={name}

          onChange={(e)=>

            setName(

              e.target.value,

            )

          }

        />

        <Input

          label="Email"

          value={email}

          onChange={(e)=>

            setEmail(

              e.target.value,

            )

          }

        />

        <Button

          onClick={save}

        >

          Save User

        </Button>

      </div>

    </Card>

  );

}