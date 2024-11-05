document.getElementById("search-button").addEventListener("click", () => {
    const cep = document.getElementById("cep").value;

    if (!cep.match(/^\d{5}-?\d{3}$/)) {
        alert("Por favor, insira um CEP válido.");
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById("result");
            if (data.erro) {
                resultDiv.innerHTML = "<p>CEP não encontrado.</p>";
            } else {
                resultDiv.innerHTML = `
                    <p><strong>Endereço:</strong> ${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}</p>
                `;
            }
        })
        .catch(error => {
            console.error("Erro ao buscar o CEP:", error);
            document.getElementById("result").innerHTML = "<p>Ocorreu um erro. Tente novamente.</p>";
        });
});
