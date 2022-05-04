import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Disclosure } from '@headlessui/react'
import {
  ChevronUpIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/solid'

const Home: NextPage = () => {
  const [companies, setCompanies] = useState([
    {
      nomeFantasia: 'Acme Software ME',
      cnpj: '92.211.058/0001-00',
      valorFaturamentoMensal: 300000.0,
      dataInicio: '2020-03-01',
    },
    {
      nomeFantasia: 'Contoso Financeira SA',
      cnpj: '98.024.704/0001-07',
      valorFaturamentoMensal: 1500000.0,
      dataInicio: '2018-09-01',
    },
    {
      nomeFantasia: 'Adventureworks  Veículos Ltda',
      cnpj: '20.234.033/0001-03',
      valorFaturamentoMensal: 2000000.0,
      dataInicio: '2016-12-01',
    },
  ])
  const [open, setOpen] = useState(false)
  // get itens from localStorage
  useEffect(() => {
    const savedCompanies = JSON.parse(
      localStorage.getItem('react-company-app-data') || '[]'
    )

    if (savedCompanies) {
      setCompanies(savedCompanies)
    }
  }, [])

  // update everytime company is modified
  useEffect(() => {
    localStorage.setItem('react-company-app-data', JSON.stringify(companies))
  }, [companies])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => {
    const newCompany = {
      nomeFantasia: data.nomeFantasia,
      cnpj: data.cnpj,
      valorFaturamentoMensal: data.faturamentoMensal,
      dataInicio: data.dataInicio,
    }
    setCompanies([...companies, newCompany])
    setOpen(!open)
  }

  function removeCompany(company: any) {
    const copyCompanies = [...companies]
    console.log(copyCompanies.indexOf(company))
    copyCompanies.splice(copyCompanies.indexOf(company), 1)
    setCompanies(copyCompanies)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>EvenCard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-20 text-center">
        {companies.map((company, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <div className='focus-visible:ring-opacity-75" mb-2 flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500'>
                  <span>{company.nomeFantasia}</span>
                  <div className="ml-2 flex w-20 justify-evenly focus:outline-none focus-visible:ring focus-visible:ring-purple-500 ">
                    <TrashIcon
                      onClick={() => removeCompany(company)}
                      className="h-5 w-5 hover:cursor-pointer hover:text-red-500 focus:outline-none focus-visible:ring focus-visible:ring-purple-500"
                    ></TrashIcon>
                    <Link href={`/details/${company.nomeFantasia}`}>
                      <a>
                        <PencilIcon className="h-5 w-5 hover:cursor-pointer hover:text-blue-500 focus:outline-none focus-visible:ring focus-visible:ring-purple-500"></PencilIcon>
                      </a>
                    </Link>
                    <Disclosure.Button>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-purple-500`}
                      />
                    </Disclosure.Button>
                  </div>
                </div>
                <Disclosure.Panel className="flex flex-col space-y-2 px-4 pt-4 pb-2 text-sm text-gray-500 ">
                  <span>CNPJ: {company.cnpj}</span>
                  <span>Faturamento: {company.valorFaturamentoMensal}</span>
                  <span>Data de Início: {company.dataInicio}</span>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}

        {open ? (
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
              {...register('nomeFantasia', { required: true })}
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
              {...register('faturamentoMensal', { required: true })}
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
        ) : (
          <PlusIcon
            onClick={() => setOpen(!open)}
            className="h-8 w-8 cursor-pointer rounded-full bg-purple-100 text-purple-500"
          />
        )}
      </main>
    </div>
  )
}

export default Home
