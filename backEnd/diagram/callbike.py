from urllib.request import urlretrieve
from diagrams import Cluster, Diagram
from diagrams.aws.database import Aurora
from diagrams.custom import Custom
from diagrams.onprem.compute import Server
from diagrams.onprem.database import PostgreSQL
from diagrams.onprem.inmemory import Redis
from diagrams.onprem.aggregator import Fluentd
from diagrams.onprem.monitoring import Grafana, Prometheus
from diagrams.onprem.network import Nginx
from diagrams.onprem.queue import Kafka

# Download an image to be used into a Custom Node class
rabbitmq_url = "https://jpadilla.github.io/rabbitmqapp/assets/img/icon.png"
rabbitmq_icon = "rabbitmq.png"
urlretrieve(rabbitmq_url, rabbitmq_icon)

with Diagram("Ứng dụng đặt xe", show=False):
    with Cluster("Ứng dụng Di động"):
        mobile_app = Custom("Mobile App\n(React Native + Expo)", "./mobile.png")

    with Cluster("Server Backend"):
        backend = Custom("Backend API\n(Node.js)", "./nodejs.png")

    with Cluster("Cơ sở Dữ liệu"):
        db = Aurora("PostgreSQL")

    # Các thành phần bổ sung
    with Cluster("In-Memory Cache"):
        cache = Redis("Redis")

    with Cluster("Message Broker"):
        message_broker = Kafka("Kafka")

    with Cluster("Logging & Monitoring"):
        logging_monitoring = [
            Fluentd("Fluentd"),
            Prometheus("Prometheus"),
            Grafana("Grafana")
        ]

    with Cluster("Load Balancer"):
        load_balancer = Nginx("Nginx")

    # Kết nối các thành phần
    mobile_app >> backend >> db
    backend >> cache
    backend >> message_broker
    backend >> logging_monitoring
    mobile_app >> load_balancer
