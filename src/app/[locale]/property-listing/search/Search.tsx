import ChevronDown from '../../components/UI/icons/ChevronDown'

function Search(props: any) {
  return (
    <div className='relative'>
      <input type='text' className={`w-64 py-3 px-4 border-[1.5px] border-main-200 rounded-lg focus-visible:outline-0 focus:border-main-400`} placeholder='Search with Search Bar' />
      <div className='absolute top-1/2 right-3 w-8 h-8 rounded-full bg-main-100 flex justify-center items-center -translate-y-1/2'>
        <ChevronDown className='stroke-main-600 w-3 h-3' />
      </div>
    </div>
  )
}

export default Search