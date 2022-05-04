import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
const Details: NextPage = () => {

  type FormData = {
    nomeFantasia: string,
    cnpj: string,
    valorFaturamentoMensal: number,
    dataInicio: string
  }

  const [companies, setCompanies] = useState<[FormData]>([])
  const [selectedCompany, setSelectedCompany] = useState<FormData>({})

  const router = useRouter()
  const { name } = router.query

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
  })

  const onSubmit = (data:any) => {
    const index = companies.findIndex(({nomeFantasia}) => nomeFantasia === selectedCompany.nomeFantasia)
    console.log(index)
    companies[index] = data.nomeFantasia
  }

  useEffect(() => {
    // Array com os objetos
    const savedCompanies = JSON.parse(
      localStorage.getItem('react-company-app-data') || '[]'
    )
    setCompanies(savedCompanies)
    
    // const selectedCompany = savedCompanies.filter((company:any) => company.nomeFantasia === name)

    const selectedCompany = companies.find(({ nomeFantasia }) => nomeFantasia === name )!
    setSelectedCompany(selectedCompany)
    console.log(selectedCompany)
    console.log(savedCompanies)
  }, [])

  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <Head>
        <title>EvenCard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form
            onSubmit={handleSubmit(onSubmit)}
            className="itens-center flex w-full flex-col bg-purple-100 px-2  py-5 "
          >
            <h2>Add a new company</h2>
            <label
              htmlFor="nomeFantasia"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              type="text"
              {...register("nomeFantasia")}
              defaultValue={selectedCompany?.nomeFantasia || ""}
              className="mb-3 block w-full rounded-md border-gray-300 py-2 px-3 focus:border-purple-500 focus:ring-indigo-500 sm:text-base"
              placeholder="Company Name"
            />
            <label
              htmlFor="cnpj"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Cnpj
            </label>
            <input
              type="text"
              {...register('cnpj', { required: true })}
              defaultValue={selectedCompany?.cnpj || ""}
              className="mb-3 block w-full rounded-md border-gray-300 py-2 px-3 focus:border-purple-500 focus:ring-indigo-500 sm:text-base"
              placeholder="Faturamento mensal"
            />
            <label
              htmlFor="faturamentoMensal"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Faturamento
            </label>
            <input
              type="text"
              {...register('valorFaturamentoMensal', { required: true })}
              defaultValue={selectedCompany?.valorFaturamentoMensal || ""}
              className="mb-3 block w-full rounded-md border-gray-300 py-2 px-3 focus:border-purple-500 focus:ring-indigo-500 sm:text-base"
              placeholder="Faturamento mensal"
            />
            <label
              htmlFor="dataInicio"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Data de Inicio
            </label>
            <input
              type="text"
              {...register('dataInicio', { required: true })}
              defaultValue={selectedCompany?.dataInicio || ""}
              className="mb-3 block w-full rounded-md border-gray-300 py-2 px-3  focus:border-purple-500 focus:ring-indigo-500 sm:text-base"
              placeholder="Company Name"
            />
            <div className="">
              <input
                type="submit"
                className=" mx-auto block cursor-pointer rounded-md border-none bg-blue-500 py-3 px-4 text-base text-white outline-none transition hover:bg-blue-300 "
              />
            </div>
            
          </form>
    </div>
  )
}

export default Details