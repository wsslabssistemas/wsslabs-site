#!/usr/bin/env python3
"""
============================================================
 GERAR PREVIEW — ferramenta de apoio, NÃO faz parte do site
------------------------------------------------------------
 Junta index.html + css + js + imagens num arquivo ÚNICO,
 só para poder visualizar o site em lugares que abrem um
 arquivo por vez (visualizador do chat, e-mail, WhatsApp).

 O site DE VERDADE é o index.html modular. Este arquivo é
 descartável: nunca edite o PREVIEW — edite o projeto e
 rode este script de novo.

 Uso:  python3 ferramentas/gerar-preview.py
============================================================
"""
import base64, mimetypes, os, re, sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SAIDA = os.path.join(RAIZ, 'PREVIEW-visualizar.html')


def ler(caminho):
    with open(os.path.join(RAIZ, caminho), encoding='utf-8') as f:
        return f.read()


def data_uri(caminho):
    """Transforma uma imagem/vídeo em texto embutido no HTML."""
    completo = os.path.join(RAIZ, caminho)
    if not os.path.exists(completo):
        print('  ! arquivo não encontrado:', caminho)
        return caminho
    tipo = mimetypes.guess_type(completo)[0] or 'application/octet-stream'
    with open(completo, 'rb') as f:
        return 'data:%s;base64,%s' % (tipo, base64.b64encode(f.read()).decode())


html = ler('index.html')

# 1) troca cada <link rel=stylesheet local> por <style> com o conteúdo dentro
def inline_css(m):
    arq = m.group(1).split('?')[0]
    print('  css  ', arq)
    return '<style>\n/* ===== %s ===== */\n%s\n</style>' % (arq, ler(arq))

html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', inline_css, html)

# 2) troca cada <script src local> pelo conteúdo do arquivo
def inline_js(m):
    arq = m.group(1).split('?')[0]
    print('  js   ', arq)
    return '<script>\n/* ===== %s ===== */\n%s\n</script>' % (arq, ler(arq))

html = re.sub(r'<script src="([^"]+)"></script>', inline_js, html)

# 3) embute as imagens e o vídeo citados no HTML
for arq in sorted(set(re.findall(r'(?:src|href|content)="((?:assets)/[^"]+)"', html))):
    print('  midia', arq)
    html = html.replace('"%s"' % arq, '"%s"' % data_uri(arq))

# 4) embute também as imagens que os arquivos de dados apontam
for arq in sorted(set(re.findall(r"'(assets/[^']+)'", html))):
    print('  midia', arq)
    html = html.replace("'%s'" % arq, "'%s'" % data_uri(arq))

# 5) o WSS.url() prefixa com a base; num arquivo único não há base
html = html.replace("return WSS.base + '/' + caminho.replace(/^\\.?\\//,'');",
                    "if(caminho.indexOf('data:')===0) return caminho;\n  return WSS.base + '/' + caminho.replace(/^\\.?\\//,'');")

aviso = ('<!-- ARQUIVO GERADO AUTOMATICAMENTE — NÃO EDITE.\n'
         '     O site de verdade é o index.html + as pastas css/ js/ assets/.\n'
         '     Para atualizar este preview: python3 ferramentas/gerar-preview.py -->\n')

with open(SAIDA, 'w', encoding='utf-8') as f:
    f.write(aviso + html)

print('\nOK ->', SAIDA, '(%.1f MB)' % (os.path.getsize(SAIDA) / 1048576))
