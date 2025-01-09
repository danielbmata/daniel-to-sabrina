function addTask() {
    const input = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    
    if (input.value.trim() === '') return;

    const li = document.createElement('li');
    li.innerHTML = `
        ${input.value}
        <button class="delete-btn" onclick="this.parentElement.remove()">Excluir</button>
    `;
    
    taskList.appendChild(li);
    input.value = '';
}

// Permitir adicionar tarefa com Enter
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Adiciona efeito de flutuação aos corações
    const heart = document.querySelector('.heart');
    if (heart) {
        setInterval(() => {
            heart.style.transform = `scale(${1 + Math.sin(Date.now() / 500) * 0.1})`;
        }, 50);
    }

    // Adiciona efeito de fade in para as mensagens
    const messages = document.querySelectorAll('.love-message');
    messages.forEach((message, index) => {
        message.style.opacity = '0';
        setTimeout(() => {
            message.style.transition = 'opacity 1s ease-in-out';
            message.style.opacity = '1';
        }, 500 * (index + 1));
    });

    // Adiciona efeito de hover nas memórias
    const memories = document.querySelectorAll('.memory');
    memories.forEach(memory => {
        memory.addEventListener('mouseenter', () => {
            memory.style.transform = 'scale(1.02)';
            memory.style.transition = 'transform 0.3s ease';
        });
        memory.addEventListener('mouseleave', () => {
            memory.style.transform = 'scale(1)';
        });
    });

    // Controle de Música
    const musicControl = document.getElementById('musicControl');
    const bgMusic = document.getElementById('bgMusic');
    
    if (musicControl && bgMusic) {
        let isPlaying = false;
        bgMusic.volume = 0.5; // Volume padrão

        // Tratamento de erro para a música
        bgMusic.addEventListener('error', function() {
            console.error('Erro ao carregar a música:', bgMusic.error);
            musicControl.style.display = 'none';
        });

        musicControl.addEventListener('click', async () => {
            try {
                if (isPlaying) {
                    await bgMusic.pause();
                    musicControl.innerHTML = '<i class="fas fa-music"></i>';
                } else {
                    const playPromise = bgMusic.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            musicControl.innerHTML = '<i class="fas fa-pause"></i>';
                        }).catch(error => {
                            console.error('Erro ao tocar música:', error);
                        });
                    }
                }
                isPlaying = !isPlaying;
            } catch (error) {
                console.error('Erro no controle de música:', error);
            }
        });
    }

    // Cria pequenos corações flutuantes aleatoriamente
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = window.innerHeight + 'px';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.opacity = '0.6';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '-1';
        document.body.appendChild(heart);

        const animation = heart.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 0.6 },
            { transform: `translateY(-${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 3000,
            easing: 'ease-out'
        });

        animation.onfinish = () => heart.remove();
    }

    setInterval(createFloatingHeart, 2000);
});
