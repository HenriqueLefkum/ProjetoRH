//A intenção aqui é mostrar a lista dos funcionarios com as informações pertinentes
//talvez mais pro futuro adicionar as opções do que mostrar e tambem para mandar pro excel ou imprimir em pdf {users.map((user) => (
                        // <tr key={user.id}></tr>

import './FuncListStyle.css'
function FuncList()
{
    return(
        <div className='content-box'>
            <div>
                    <table>
                        <thead>
                            <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>CPF</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><button>Nome</button></td>
                                <td><button>Email</button></td>
                                <td><button>CPF</button></td>
                            </tr>
                            </tbody>
                    </table>
                </div>
        </div>
    );
}

export default FuncList;